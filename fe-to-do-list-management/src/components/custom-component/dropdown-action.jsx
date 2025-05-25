"use client"
import { ModalEdit } from "./modal-edit";
import { Button } from "../ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Menu, Pencil, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DropdownAction(params) {
    const router = useRouter();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    async function handleDelete(id) {
        try {
            const result = await fetch(`http://localhost:8080/tasks/delete/${id}`, {
                method: 'DELETE',
                headers: { "Content-Type": "application/json" }
            })

            if (result.ok) {
                router.push("/dashboard");
            }
        } catch (err) {
            alert()
        }
    }

    function closeModal() {
        setIsEditModalOpen(false)
        setTimeout(() => {
            document.body.style.pointerEvents = "";
            const overlays = document.querySelectorAll('[data-overlay]');
            overlays.forEach(el => el.remove());
        }, 0);
    }

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                        <Menu size={20} />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Action</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleDelete(params.id)}>
                        <Trash2Icon />
                        <span>Delete</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsEditModalOpen(true)}>
                        <Pencil />
                        <span>Edit</span>
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>

            <ModalEdit
                id={params.id}
                isOpen={isEditModalOpen}
                onClose={() =>
                    closeModal()
                }
            />
        </div>
    );
}