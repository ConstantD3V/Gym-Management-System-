import frappe
from frappe.utils import nowdate, date_diff

@frappe.whitelist()
def get_customer_profile():
    user = frappe.session.user
    member = frappe.get_value("Gym Registration", {"owner": user}, "name")

    if not member:
        return {}

    doc = frappe.get_doc("Gym Registration", member)

    active_plan = None
    remaining_days = 0
    if doc.choose_plan:
        plan = frappe.get_doc("Membership Plan", doc.choose_plan[0].plan)
        active_plan = plan.plan_name
        remaining_days = max(0, date_diff(plan.end_date, nowdate()))

    trainer_name = None
    trainer_contact = None
    if doc.choose_train:
        trainer = frappe.get_doc("Gym trainer", doc.choose_train)
        trainer_name = trainer.trainer_name
        trainer_contact = trainer.contact_number

    past_plans = frappe.get_all(
        "Membership Plan",
        filters={"member": member, "status": "Expired"},
        fields=["plan_name"]
    )

    return {
        "active_plan": active_plan,
        "remaining_days": remaining_days,
        "trainer_name": trainer_name,
        "trainer_contact": trainer_contact,
        "past_plans": [plan["plan_name"] for plan in past_plans]
    }
