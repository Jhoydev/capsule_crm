import { Meta, StoryObj } from "@storybook/react";
import { PropertyForm } from "@/app/(app)/properties/components/PropertyForm";
import {usePropertyForm} from "@/hooks/property/usePropertyForm";
import React from "react";

const data = {
    id: 1,
    reference: '',
    type: "flat",
    state: "new",
    status: "available",
    contact_id: 0,
    user_id: 1,
    latitude: 0,
    longitude: 0,
    image: [],
    floor: "0",
    door: "0"
}

const meta: Meta<typeof PropertyForm> = {
    parameters: {
      nextjs: {
          appDirectory: true,
      }
    },
    title: "Organisms/PropertyForm",
    component: PropertyForm,
    args: {
        handleSubmit: async (values) => {
            console.log(values);
        },
        handleDelete: async () => {
            console.log('paz');
        },
        isSubmitting: false,
        data,
        isNew: false,
        rechargeFunctionProperty: async () => {
            console.log('paz');
        },
        handleViewMode: (mode: "edit" | "view") => {
            console.log(mode);
        },
    },
};

export default meta;

export const Default: StoryObj<typeof PropertyForm> = {
    render: (args) => {
        const methods = usePropertyForm(data)
        return (
            <PropertyForm {...args}  methods={methods}/>
        );
    },
};