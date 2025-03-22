import { Button } from "@/components/ui/button";

export default {
    title: "UI/Button",
    component: Button,
};

export const Default = () => <Button>Click me</Button>;

export const Outline = () => <Button variant="outline">Outline</Button>;

export const Destructive = () => <Button variant="destructive">Delete</Button>;

export const Disabled = () => <Button disabled>Disabled</Button>;