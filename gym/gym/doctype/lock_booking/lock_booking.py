# Copyright (c) 2025, Ronit and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class LockBooking(Document):
	
    def update_locker_status(self):
        if self.choose_lock:  
            locker_doc = frappe.get_doc("Locker Collection", self.choose_lock)
            locker_doc.sel_status = "Booked"
            locker_doc.save()
            frappe.db.commit()

    def on_submit(self):
        self.update_locker_status()