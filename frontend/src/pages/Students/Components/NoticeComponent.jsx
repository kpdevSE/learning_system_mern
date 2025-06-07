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
import { Asterisk } from "lucide-react"
import { useState, useEffect } from "react"

export default function NoticeComponent()
{
    const [isOpen, setIsOpen] = useState(false)

    // Auto-open dialog on component mount (page load/refresh)
    useEffect(() =>
    {
        setIsOpen(true)
    }, [])

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Asterisk className="mr-2" /> Notice
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>📢 Important Notice</DialogTitle>
                    <DialogDescription className="space-y-4 text-sm leading-relaxed text-muted-foreground mt-2">
                        <p>👋 Hello Students,</p>
                        <p className="font-semibold">
                            📥 You can now download your assignments and exams directly from the platform. Once
                            completed, please email them to your respective lecturer. After your results are
                            published, you will receive a message, and you'll be able to log in to the system to
                            check your grades. An email notification will also be sent. 📧
                        </p>
                        <p className="text-green-600 font-semibold">
                            🤖 In the near future, we will be adding AI-powered automatic grading for assignments
                            and exams, making the experience even smoother!
                        </p>
                        <p className="font-bold">🙏 Thank you,</p>
                        <p className="font-bold">— Admin</p>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4">
                    <DialogClose asChild>
                        <Button variant="outline" onClick={() => setIsOpen(false)}>
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}