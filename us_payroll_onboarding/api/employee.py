import frappe

@frappe.whitelist(allow_guest=True)
def create_employee(first_name, classification, state):
    

    doc = frappe.new_doc("Employee")
    doc.first_name = first_name
    doc.custom_worker_type = classification
    doc.state = state

    
    doc.custom_created_from_payroll_onboarding_app = 1  
    doc.flags.ignore_mandatory = True
    doc.insert()

    return {
        "name": doc.name
    }