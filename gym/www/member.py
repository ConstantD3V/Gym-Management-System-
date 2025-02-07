import frappe

def get_context(context):
    user = frappe.session.user

    gym_member = frappe.get_all("Gym Member",
                                filters={"membr_name": user},
                                fields=["membr_name", "train_assigned", "rem_days"])

    if gym_member:
        context.gym_member = gym_member[0]
    else:
        context.gym_member = None

    return context
