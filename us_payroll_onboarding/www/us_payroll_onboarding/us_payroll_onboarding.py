import frappe

def get_context(context):
    """
    Restrict this page so only logged-in users can access it.
    If user is Guest, redirect to /login.
    """
    if frappe.session.user == "Guest":
        frappe.local.flags.redirect_location = "/login"
        raise frappe.Redirect

    # Optional: Pass the logged-in user info to your frontend (React)
    context.user = frappe.session.user
