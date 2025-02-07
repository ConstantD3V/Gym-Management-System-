// Copyright (c) 2025, Ronit and contributors
// For license information, please see license.txt

frappe.ui.form.on("Gym trainer", {

    special_check : function(frm) {
        if(frm.doc.special_check){
            frm.set_df_property('choice_special','hidden',0);
            frm.set_df_property('fees_train','hidden',0);
            frm.set_df_property('book_train','reqd',1);
            frm.set_df_property('fees_train','reqd',1);
        }
        else {
            frm.set_df_property('choice_special','hidden',1);
            frm.set_df_property('fees_train','hidden',1);
            frm.set_df_property('book_train','reqd',0);
            frm.set_df_property('fees_train','reqd',0);
        }
        frm.refresh_field('book_train');
        frm.refresh_field('fees_train');
    },
});
