import { useState } from "react"
import { Button } from "@/components/ui/button"
import
{
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle, Trash2, Plus } from "lucide-react"
import { toast } from "sonner"
import axios from "axios"

export default function ExamComponent()
{
    const [examData, setExamData] = useState({
        title: "",
        subject: "",
        duration: "",
        totalMarks: 0,
        instructions: "",
        essays: []
    })

    const [essays, setEssays] = useState([
        { id: 1, question: "", marks: 0, instructions: "" }
    ])

    const addEssay = () =>
    {
        const newEssay = {
            id: Date.now(),
            question: "",
            marks: 0,
            instructions: ""
        }
        setEssays([...essays, newEssay])
    }

    const removeEssay = (id) =>
    {
        if (essays.length > 1)
        {
            setEssays(essays.filter(essay => essay.id !== id))
        }
    }

    const updateEssay = (id, field, value) =>
    {
        setEssays(essays.map(essay =>
            essay.id === id ? { ...essay, [field]: value } : essay
        ))
    }

    const calculateTotalMarks = () =>
    {
        return essays.reduce((total, essay) => total + (parseInt(essay.marks) || 0), 0)
    }

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (e) =>
    {
        e.preventDefault();
        setIsSubmitting(true);

        try
        {
            const examToSubmit = {
                title: examData.title,
                subject: examData.subject,
                duration: examData.duration,
                instructions: examData.instructions,
                essays: essays.map(essay => ({
                    question: essay.question,
                    marks: essay.marks,
                    instructions: essay.instructions
                }))
            };
            const token = localStorage.getItem('token')
            const response = await axios.post('http://localhost:5000/api/users/saveexams', examToSubmit, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            const result = response.data;

            if (result.success)
            {
                toast.success("Exam created successfully!");

                // Reset form
                setExamData({
                    title: "",
                    subject: "",
                    duration: "",
                    totalMarks: 0,
                    instructions: "",
                    essays: []
                });
                setEssays([{ id: 1, question: "", marks: 0, instructions: "" }]);
            } else
            {
                toast.success(`Error: ${result.message}`);
            }

        } catch (error)
        {
            console.error('Error creating exam:', error);
            const message = error.response?.data?.message || 'Failed to create exam. Please try again.';
            toast.error(message);
        } finally
        {
            setIsSubmitting(false);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                    <PlusCircle className="w-4 h-4" />
                    Create Exam
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <div onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Create New Exam</DialogTitle>
                        <DialogDescription>
                            Set up your exam with essay questions and marking scheme. Fill in all required fields.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-6 py-4">
                        {/* Basic Exam Information */}
                        <div className="grid gap-4">
                            <h3 className="font-semibold text-lg">Exam Details</h3>

                            <div className="grid gap-2">
                                <Label htmlFor="exam-title">Exam Title *</Label>
                                <Input
                                    id="exam-title"
                                    placeholder="e.g., Mid-term English Literature Exam"
                                    value={examData.title}
                                    onChange={(e) => setExamData({ ...examData, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="subject">Subject *</Label>
                                    <Input
                                        id="subject"
                                        placeholder="e.g., English Literature"
                                        value={examData.subject}
                                        onChange={(e) => setExamData({ ...examData, subject: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="duration">Duration (minutes) *</Label>
                                    <Input
                                        id="duration"
                                        type="number"
                                        placeholder="e.g., 120"
                                        value={examData.duration}
                                        onChange={(e) => setExamData({ ...examData, duration: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="instructions">General Instructions</Label>
                                <textarea
                                    id="instructions"
                                    className="min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="Enter general exam instructions..."
                                    value={examData.instructions}
                                    onChange={(e) => setExamData({ ...examData, instructions: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Essay Questions Section */}
                        <div className="grid gap-4">
                            <div className="flex items-center justify-between">
                                <h3 className="font-semibold text-lg">Essay Questions</h3>
                                <div className="text-sm text-muted-foreground">
                                    Total Marks: <span className="font-semibold">{calculateTotalMarks()}</span>
                                </div>
                            </div>

                            {essays.map((essay, index) => (
                                <div key={essay.id} className="border rounded-lg p-4 bg-gray-50">
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="font-medium">Question {index + 1}</h4>
                                        {essays.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => removeEssay(essay.id)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>

                                    <div className="grid gap-3">
                                        <div className="grid gap-2">
                                            <Label htmlFor={`question-${essay.id}`}>Essay Question *</Label>
                                            <textarea
                                                id={`question-${essay.id}`}
                                                className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                placeholder="Enter the essay question..."
                                                value={essay.question}
                                                onChange={(e) => updateEssay(essay.id, 'question', e.target.value)}
                                                required
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="grid gap-2">
                                                <Label htmlFor={`marks-${essay.id}`}>Marks *</Label>
                                                <Input
                                                    id={`marks-${essay.id}`}
                                                    type="number"
                                                    min="0"
                                                    placeholder="e.g., 25"
                                                    value={essay.marks}
                                                    onChange={(e) => updateEssay(essay.id, 'marks', e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor={`instructions-${essay.id}`}>Question Instructions</Label>
                                                <Input
                                                    id={`instructions-${essay.id}`}
                                                    placeholder="e.g., Answer in 300-400 words"
                                                    value={essay.instructions}
                                                    onChange={(e) => updateEssay(essay.id, 'instructions', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <Button
                                type="button"
                                variant="outline"
                                onClick={addEssay}
                                className="flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                Add Another Essay Question
                            </Button>
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Creating..." : "Create Exam"}
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}