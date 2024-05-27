

export const ContactActionTypes = {
    LIST_CONTACT: 'LIST_CONTACT',
    SET_CONTACT: 'SET_CONTACT',
    UPDATE_CONTACT: 'UPDATE_CONTACT',
    DELETE_CONTACT: 'DELETE_CONTACT',
    DELETE_CONTACTS: 'DELETE_CONTACTS',
  };
  
  export const contactActions = {
    listContact: (items) => ({
      type: ContactActionTypes.LIST_CONTACT,
      payload: items,
    }),
    setContact: (item) => ({
      type: ContactActionTypes.SET_CONTACT,
      payload: item,
    }),
    updateContact: (item) => ({
      type: ContactActionTypes.UPDATE_CONTACT,
      payload: item,
    }),
    deleteContact: (item) => ({
      type: ContactActionTypes.DELETE_CONTACT,
      payload: item,
    }),
  
    deleteContacts: (ids) => ({
      type: ContactActionTypes.DELETE_CONTACTS,
      payload: ids,
    }),
  };
  