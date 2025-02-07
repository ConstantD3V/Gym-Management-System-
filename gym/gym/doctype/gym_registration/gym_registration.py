# Copyright (c) 2025, Ronit and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import get_datetime, add_days, nowdate


class GymRegistration(Document):
    def update_locker_status(self):
        """
        Updates the status of the locker to "Booked" if a locker is booked.
        """
        if self.book_lock:  
            locker_doc = frappe.get_doc("Locker Collection", self.book_lock)
            locker_doc.sel_status = "Booked"
            locker_doc.save()
            frappe.db.commit()

    def on_submit(self):
        """
        Triggered when the Gym Registration document is submitted.
        """
        self.update_locker_status()


def send_class_booking_email(doc, method):
    """Send an email notification when a class is booked."""
    if doc.get("book_class"):  # Ensure there are booked classes
        recipient_email = doc.email
        member_name = doc.full_name

        classes_info = ""
        for class_entry in doc.get("book_class"):  # Iterate over the child table `book_class`
            class_name = class_entry.choose_class  # Correct field from Gym classes
            duration = class_entry.dur_per  # Correct field from Gym classes
            preferred_time = class_entry.schedule  # Correct field from Gym classes

            classes_info += f"<li><b>{class_name}</b> - {duration} at {preferred_time}</li>"

        if classes_info:
            subject = "Gym Class Booking Confirmation"
            message = f"""
                <p>Dear {member_name},</p>
                <p>You have successfully booked the following class(es):</p>
                <ul>{classes_info}</ul>
                <p>We look forward to seeing you!</p>
                <p>Best regards,<br>Gym Management</p>
            """

            frappe.sendmail(
                recipients=[recipient_email],
                subject=subject,
                message=message
            )

