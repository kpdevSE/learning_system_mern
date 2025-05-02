import { Button } from "@/components/ui/button"
import
{
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CheckCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import axios from "axios"
import { toast } from "sonner"


export default function PurchaseComponent({ loggedUser, price, lecturerEmail, duration, quantity, fullDescription, smallDescription, topicOne, topicTwo, imageUrl, username, youtubeUrl })
{

    const [loggedUserEmail, setLoggedUserEmail] = useState(loggedUser)
    const [savedYoutubeUrl, setSavedyoutubeUrl] = useState(youtubeUrl)
    const [savedPrice, setSavedPrice] = useState(price)
    const [savedLecturerEmail, setSavedLecturerEmail] = useState(lecturerEmail)
    const [savedDuration, setSavedDuration] = useState(duration)
    const [savedQuantity, setSavedQuantity] = useState(quantity)
    const [savedFullDescription, setSavedFullDescription] = useState(fullDescription)
    const [savedSmallDescription, setSavedSmallDescription] = useState(smallDescription)
    const [savedTopicOne, setSavedTopicOne] = useState(topicOne)
    const [savedTopicTwo, setSavedTopicTwo] = useState(topicTwo)
    const [savedImageUrl, setSavedImageUrl] = useState(imageUrl)
    const [savedUsername, setSavedUsername] = useState(username)
    const [cardNumber, setCardNumber] = useState("")
    const [exDate, setExDate] = useState("")
    const [cvv, setCvv] = useState("")
    const [cardHolderName, setCardHolderName] = useState("")

    console.log(youtubeUrl)

    const handlePayment = async (e) =>
    {
        e.preventDefault()
        const payload = {
            loggedUserEmail,
            savedPrice,
            savedYoutubeUrl,
            savedLecturerEmail,
            savedDuration,
            savedQuantity,
            savedFullDescription,
            savedSmallDescription,
            savedTopicOne,
            savedTopicTwo,
            savedImageUrl,
            savedUsername,
            cardNumber,
            exDate,
            cvv,
            cardHolderName
        }
        console.log(payload)


        try
        {
            const token = localStorage.getItem('token');
            const res = await axios.post("http://localhost:5000/api/users/payement", payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            if (res.data.success)
            {
                toast.success("Congratulations! Your Payement is Successfull")
                window.location.reload()
            }
        } catch (err)
        {
            console.error("Payment failed:", err)
            toast.error("Payment failed.")
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button><CheckCircle className="w-4 h-4 mr-2" />Make Payment</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Make Payment - <span className="text-xl font-bold">{username}</span> <span className="text-xl font-bold">({loggedUser})</span></DialogTitle>
                    <DialogDescription>
                        Enter your payment details below to complete the transaction.
                    </DialogDescription>
                </DialogHeader>

                <form action="" onSubmit={handlePayment}>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input id="cardNumber" type="text" placeholder="1234 5678 9012 3456" required value={cardNumber} onChange={(e) =>
                            {
                                setCardNumber(e.target.value)
                            }
                            } />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="expiry">Expiry Date</Label>
                                <Input id="expiry" type="text" placeholder="MM/YY" required value={exDate} onChange={(e) =>
                                {
                                    setExDate(e.target.value)
                                }
                                } />
                            </div>
                            <div>
                                <Label htmlFor="cvv">CVV</Label>
                                <Input id="cvv" type="password" placeholder="•••" required value={cvv} onChange={(e) =>
                                {
                                    setCvv(e.target.value)
                                }
                                } />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="name">Cardholder Name</Label>
                            <Input id="name" type="text" placeholder="John Doe" required value={cardHolderName} onChange={(e) =>
                            {
                                setCardHolderName(e.target.value)
                            }
                            } />
                        </div>
                        <Button type="submit">Pay Now</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
