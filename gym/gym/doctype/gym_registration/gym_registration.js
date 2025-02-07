frappe.ui.form.on('Gym Registration', {

    onload: function(frm) {
        frm.trigger('choose_train');
        frm.trigger('check_loc');
        frm.trigger('check_class');
    },

    choose_train : function(frm) {
        if(frm.doc.choose_train){
            frm.set_df_property('book_train','hidden',0);
            frm.set_df_property('fees_train','hidden',0);
            frm.set_df_property('book_train','reqd',1);
            frm.set_df_property('fees_train','reqd',1);
        }
        else {
            frm.set_df_property('book_train','hidden',1);
            frm.set_df_property('fees_train','hidden',1);
            frm.set_df_property('book_train','reqd',0);
            frm.set_df_property('fees_train','reqd',0);
        }
        frm.refresh_field('book_train');
        frm.refresh_field('fees_train');
    },

    check_loc: function(frm) {
        if (frm.doc.check_loc) {
            frm.set_df_property('book_lock', 'hidden', 0);
            frm.set_df_property('locker_fees', 'hidden', 0);
            frm.set_df_property('book_lock', 'reqd', 1);
            frm.set_df_property('locker_fees', 'reqd', 1);
        } else {
            frm.set_df_property('book_lock', 'hidden', 1);
            frm.set_df_property('locker_fees', 'hidden', 1);
            frm.set_df_property('book_lock', 'reqd', 0);
            frm.set_df_property('locker_fees', 'reqd', 0);
        }
        frm.refresh_field('book_lock');
        frm.refresh_field('locker_fees');
    },

    check_class: function(frm) {
        if (frm.doc.check_class) {
            frm.set_df_property('book_class', 'hidden', 0);
            frm.set_df_property('class_fees', 'hidden', 0);
            frm.set_df_property('book_class', 'reqd', 1);
            frm.set_df_property('class_fees', 'reqd', 1);
            frm.set_df_property('class_check', 'default', 1); 
        } else {
            frm.set_df_property('book_class', 'hidden', 1);
            frm.set_df_property('class_fees', 'hidden', 1);
            frm.set_df_property('book_class', 'reqd', 0);
            frm.set_df_property('class_fees', 'reqd', 0);
            frm.set_value('class_fees', 0);  
            frm.set_df_property('class_check', 'default', 0); 
        }
        frm.refresh_field('book_class');
        frm.refresh_field('class_fees');
    },

    refresh: function(frm) {
        if (frm.doc.choose_plan && frm.doc.choose_plan.length >= 1) {
            frm.fields_dict['choose_plan'].grid.wrapper.find('.grid-add-row').hide();
            
        } else {
            frm.fields_dict['choose_plan'].grid.wrapper.find('.grid-add-row').show();
        }
    },
    choose_plan_remove: function(frm) {
        if (!frm.doc.choose_plan || frm.doc.choose_plan.length === 0) {
            frm.fields_dict['choose_plan'].grid.wrapper.find('.grid-add-row').show();
        }
    }

});
