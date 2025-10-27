@frappe.whitelist(allow_guest=True)
def create_i9_form(employee_name, form_data):
    if not frappe.db.exists("Employee", employee_name):
        frappe.throw(_("Employee does not exist: {0}").format(employee_name))

    data = frappe.parse_json(form_data)
    doc = frappe.new_doc("I9 Form")
    doc.employee = employee_name  # link to Employee

    # fill fields
    doc.first_name_given_name = data.get("firstName")
    doc.last_name_family_name = data.get("lastName")
    doc.middle_initial_if_any = data.get("middleInitial")
    doc.address_street_number_and_name = data.get("address")
    doc.apt_number_if_any = data.get("aptNumber")
    doc.city_or_town = data.get("city")
    doc.custom_county = data.get("county")
    doc.state = data.get("state")
    doc.zip_code = data.get("zipCode")
    doc.date_of_birth_mmddyyyy = data.get("dateOfBirth")
    doc.us_social_security_number = data.get("socialSecurityNumber")

    doc.flags.ignore_mandatory = True
    doc.insert(ignore_permissions=True)
    frappe.db.commit()

    return {"message": "✅ I9 Form created successfully!", "i9_form_id": doc.name}
