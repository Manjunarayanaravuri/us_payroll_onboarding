import frappe
import json

@frappe.whitelist(allow_guest=True)
def create_basic_i9_form(employee, form_data, custom_employee_id=None):
    if isinstance(form_data, str):
        form_data = json.loads(form_data)

    def get_value(*keys):
        for key in keys:
            if key in form_data:
                return form_data[key]
        return None

    def get_nested(doc_key, field):
        if isinstance(form_data.get(doc_key), dict):
            return form_data[doc_key].get(field)
        return None

    citizenship_status = get_value("citizenshipStatus")
    citizen = noncitizen = uscis = a_noncitizen = 0

    if citizenship_status == "A citizen of the United States":
        citizen = 1
    elif citizenship_status == "A noncitizen national of the United States":
        noncitizen = 1
    elif citizenship_status == "A lawful permanent resident":
        uscis = 1
    elif citizenship_status == "An alien authorized to work":
        a_noncitizen = 1

    mapped_data = {
        "first_name_given_name": get_value("first_name", "firstName"),
        "last_name_family_name": get_value("last_name", "lastName"),
        "middle_initial_if_any": get_value("middle_initial", "middleInitial"),
        "address_street_number_and_name": get_value("address", "addressStreet"),
        "apt_number_if_any": get_value("aptNumber", "apartmentNumber"),
        "city_or_town": get_value("city", "cityOrTown"),
        "custom_county": get_value("county", "customCounty"),
        "state": get_value("state", "stateOfResidence"),
        "zip_code": get_value("zipCode", "zipcode", "postalCode"),
        "date_of_birth_mmddyyyy": get_value("dateOfBirth", "dob"),
        "us_social_security_number": get_value("socialSecurityNumber", "ssn"),
        "citizen": citizen,
        "noncitizen": noncitizen,
        "uscis": uscis,
        "a_noncitizen": a_noncitizen,
        "data_kbek": get_value("uscisNumber"),
        "form_i_94_admission_number_o": get_value("formI94AdmissionNumber"),
        "uscis_a_number": get_value("foreignPassportNumber"),
        "foreign_passport_number_and_country_of_issuance": get_value("countryOfIssuance"),
        "data_cbhn": get_nested("listADocument", "title"),
        "data_pyyi": get_nested("listADocument", "issuingAuthority"),
        "data_klwz": get_nested("listADocument", "documentNumber"),
        "data_zfbc": get_nested("listADocument", "expirationDate"),
        "data_fafj": get_nested("listBDocument", "title"),
        "data_vlvm": get_nested("listBDocument", "issuingAuthority"),
        "data_btkn": get_nested("listBDocument", "documentNumber"),
        "data_flku": get_nested("listBDocument", "expirationDate"),
        "data_mqsq": get_nested("listCDocument", "title"),
        "data_gcww": get_nested("listCDocument", "issuingAuthority"),
        "data_vxkx": get_nested("listCDocument", "documentNumber"),
    }

    i9_doc = frappe.new_doc("I9 Form")
    i9_doc.flags.ignore_mandatory = True
    i9_doc.flags.ignore_permissions = True
    i9_doc.flags.ignore_links = True
    i9_doc.update(mapped_data)
    i9_doc.employee = employee

    if custom_employee_id:
        i9_doc.custom_employee_id = custom_employee_id

    i9_doc.insert(ignore_permissions=True)
    frappe.db.commit()

    return {
        "name": i9_doc.name
    }
