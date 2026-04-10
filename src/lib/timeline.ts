import { Contact } from '@/types/contact.types';
import { Property } from '@/types/property.types';

export type TimelineIcon =
    | 'user'
    | 'mail'
    | 'phone'
    | 'note'
    | 'shield'
    | 'link'
    | 'home'
    | 'price'
    | 'image'
    | 'map'
    | 'sparkles';

export type TimelineItem = {
    id: string;
    title: string;
    description: string;
    meta?: string;
    icon?: TimelineIcon;
};

const formatStatus = (value?: string) => {
    if (!value) return 'unknown';

    return value.replace(/_/g, ' ');
};

export const buildContactTimeline = (contact: Contact): TimelineItem[] => {
    const items: TimelineItem[] = [
        {
            id: 'contact-profile',
            title: 'Contact profile available',
            description: `${contact.first_name} ${contact.last_name}`.trim() || 'Unnamed contact',
            meta: 'Profile',
            icon: 'user',
        },
    ];

    if (contact.email) {
        items.push({
            id: 'contact-email',
            title: 'Primary email registered',
            description: contact.email,
            meta: 'Contact data',
            icon: 'mail',
        });
    }

    if (contact.phone || contact.mobile) {
        items.push({
            id: 'contact-phone',
            title: 'Phone channels available',
            description: [contact.phone, contact.mobile].filter(Boolean).join(' / '),
            meta: 'Contact data',
            icon: 'phone',
        });
    }

    items.push({
        id: 'contact-medium',
        title: 'Preferred contact medium defined',
        description: formatStatus(contact.contact_medium),
        meta: 'Preference',
        icon: 'sparkles',
    });

    if (contact.profession || contact.company) {
        items.push({
            id: 'contact-profession',
            title: 'Professional context added',
            description: [contact.profession, contact.company].filter(Boolean).join(' at '),
            meta: 'Profile enrichment',
            icon: 'user',
        });
    }

    if (contact.rgpd) {
        items.push({
            id: 'contact-rgpd',
            title: 'RGPD information captured',
            description: contact.rgpd,
            meta: 'Privacy',
            icon: 'shield',
        });
    }

    if (contact.notes) {
        items.push({
            id: 'contact-notes',
            title: 'Internal notes available',
            description: contact.notes,
            meta: 'Notes',
            icon: 'note',
        });
    }

    if (contact.properties?.length) {
        items.push({
            id: 'contact-relations',
            title: 'Properties linked to contact',
            description: `${contact.properties.length} related propert${contact.properties.length === 1 ? 'y' : 'ies'}`,
            meta: 'Relations',
            icon: 'link',
        });
    }

    return items;
};

export const buildPropertyTimeline = (property: Property): TimelineItem[] => {
    const items: TimelineItem[] = [
        {
            id: 'property-reference',
            title: 'Property registered in CRM',
            description: property.reference,
            meta: 'Reference',
            icon: 'home',
        },
        {
            id: 'property-status',
            title: 'Current commercial status',
            description: `${formatStatus(property.status)}${property.is_available ? ' and available' : ''}`,
            meta: 'Status',
            icon: 'sparkles',
        },
    ];

    if (property.operation || property.sale_price || property.rent_price || property.transfer_price) {
        const priceSummary = [
            property.operation ? `operation: ${property.operation}` : null,
            property.sale_price ? `sale: ${property.sale_price} EUR` : null,
            property.rent_price ? `rent: ${property.rent_price} EUR` : null,
            property.transfer_price ? `transfer: ${property.transfer_price} EUR` : null,
        ]
            .filter(Boolean)
            .join(' | ');

        items.push({
            id: 'property-pricing',
            title: 'Pricing information configured',
            description: priceSummary,
            meta: 'Pricing',
            icon: 'price',
        });
    }

    if (property.city || property.street || property.zone) {
        items.push({
            id: 'property-location',
            title: 'Location completed',
            description: [property.street, property.street_number, property.city, property.zone].filter(Boolean).join(', '),
            meta: 'Location',
            icon: 'map',
        });
    }

    if (property.contact || property.contact_id) {
        const contactName = property.contact
            ? `${property.contact.first_name} ${property.contact.last_name}`.trim()
            : `Contact #${property.contact_id}`;

        items.push({
            id: 'property-contact',
            title: 'Owner or related contact assigned',
            description: contactName,
            meta: 'Relationship',
            icon: 'link',
        });
    }

    if (property.image?.length) {
        items.push({
            id: 'property-images',
            title: 'Gallery content uploaded',
            description: `${property.image.length} image${property.image.length === 1 ? '' : 's'} available`,
            meta: 'Media',
            icon: 'image',
        });
    }

    if (property.description || property.title) {
        items.push({
            id: 'property-description',
            title: 'Commercial description available',
            description: property.title || property.description || 'Property copy completed',
            meta: 'Content',
            icon: 'note',
        });
    }

    return items;
};
