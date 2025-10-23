import frappe
from frappe import _

@frappe.whitelist(allow_guest=False)
def create_employee(first_name, classification, state):
    # ✅ Validate Authorization Header (API Key + Secret)
    auth = frappe.get_request_header("Authorization")
    if not auth or not auth.startswith("token "):
        frappe.throw(_("Missing or invalid Authorization header."), frappe.PermissionError)

    try:
        _, credentials = auth.split(" ", 1)
        api_key, api_secret = credentials.split(":", 1)
    except Exception:
        frappe.throw(_("Invalid Authorization header format."), frappe.PermissionError)

    # ✅ Get stored credentials from US Payroll Settings
    settings = frappe.get_single("us payroll settings")
    stored_key = settings.api_key
    stored_secret = settings.api_secret

    # ✅ Verify API credentials
    if api_key != stored_key or api_secret != stored_secret:
        frappe.throw(_("Invalid API Key or Secret."), frappe.PermissionError)

    # ✅ Identify the user linked to the API Key
    user = frappe.db.get_value("User", {"api_key": api_key}, "name")
    if not user:
        frappe.throw(_("No valid user linked to API key in US Payroll Settings"), frappe.PermissionError)

    # ✅ Temporarily set the request context to that user
    frappe.set_user(user)

    # ✅ Create Employee securely
    doc = frappe.new_doc("Employee")
    doc.first_name = first_name
    doc.custom_worker_type = classification
    doc.state = state
    doc.custom_created_from_payroll_onboarding_app = 1
    doc.status = "Active"
    doc.flags.ignore_mandatory = True
    doc.insert(ignore_permissions=True)
    frappe.db.commit()

    return {
        "message": {
            "name": doc.name,
            "first_name": doc.first_name,
            "custom_worker_type": doc.custom_worker_type,
            "state": doc.state,
            "status": doc.status,
            "created_by": user,
            "success": True,
        }
    }