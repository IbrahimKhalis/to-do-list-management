"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Plus, Flag } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation";
import StatusEnum from "@/constant/enums/status.enum"

export function ModalForm() {
    const [open, setOpen] = React.useState(false);

    const router = useRouter();

    const [formData, setFormData] = React.useState({
        title: "",
        desc: "",
        priority: "",
        deadline: new Date(),
        status: StatusEnum.todo,
        created_by: '',
        updated_by: ''
    })

    function handleInputChanges({ name, value }) {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    async function handleSubmit() {
        try {
            const result = await fetch('http://localhost:8080/tasks', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: { "Content-Type": "application/json" }
            })

            if (result.ok) {
                router.push("/dashboard");
                setOpen(false);
            }
        } catch (err) {
            alert(err)
        }
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus size={20} />
                    Add Task
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add task</DialogTitle>
                    <DialogDescription>
                        Add your task here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                            Title
                        </Label>
                        <Input
                            id="title"
                            placeholder="Title"
                            name="title"
                            value={formData.title}
                            onChange={(e) => handleInputChanges(e.target)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="Description" className="text-right">
                            Description
                        </Label>
                        <Input
                            id="Description"
                            placeholder="Description"
                            name="desc"
                            value={formData.desc}
                            onChange={(e) => handleInputChanges(e.target)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="Priority" className="text-right">
                            Priority
                        </Label>
                        <Select name="priority" onValueChange={(e) => handleInputChanges({ value: e, name: "priority" })}>
                            <SelectTrigger className="sm:w-[280px]" >
                                <SelectValue placeholder="Priority" />
                            </SelectTrigger>
                            <SelectContent id="Priority">
                                <SelectItem value="urgent">
                                    <Flag color="red" />
                                    Urgent
                                </SelectItem>
                                <SelectItem value="high">
                                    <Flag color="orange" />
                                    High
                                </SelectItem>
                                <SelectItem value="normal">
                                    <Flag color="green" />
                                    Normal
                                </SelectItem>
                                <SelectItem value="low">
                                    <Flag color="blue" />
                                    Low
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="deadline" className="text-right">
                            Deadline
                        </Label>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-[280px] justify-start text-left font-normal",
                                        !formData.deadline && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon />
                                    {formData.deadline ? format(formData.deadline, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={new Date(formData.deadline)}
                                    onSelect={(day) => {
                                        if (day) {
                                            handleInputChanges({ name: 'deadline', value: day });
                                        }
                                    }}
                                    initialFocus
                                />

                            </PopoverContent>
                        </Popover>
                    </div>

                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}