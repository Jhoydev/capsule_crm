import { useCallback } from "react";
import { Property } from "@/types/property.types";
import { ContactService } from "@/services/contact.service";
import { Contact } from "@/types/contact.types";

export const usePropertyContact = (setProperty: (property: Property) => void) => {
    const handlerRechargeProperty = useCallback(async (property: Property) => {
        if (!property.contact) {
            try {
                const contactService = new ContactService();
                const contact: Contact = await contactService.getContact(Number(property.contact_id));
                setProperty({ ...property, contact });
            } catch (error) {
                console.error("Error fetching contact:", error);
            }
        }
    }, []);

    return { handlerRechargeProperty };
};