"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { TextEditor } from "@/components/shared/text-editor"
import { useCallback, useRef, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useData } from "@/providers/data-provider"
import { Loader2 } from "lucide-react"

export function Summary({ engagementId }) {

    const executiveSummary = useRef(null)
    const {toast} = useToast()
    const { engagements, setEngagements, loadingEngagements } = useData()

    const engagement = engagements.filter((engagement) => engagement._id == engagementId)[0]

    const submit = useCallback(async () => {
        const editor = executiveSummary.current;

        // Handle the case where editor is null
        if (editor) {

            const res = await fetch(`/api/engagements/${engagementId}`, { 
                method: "POST",
                body: JSON.stringify({executiveSummary: editor.children})
            }) 
            
            const data = await res.json()
            let updatedEngagements = [...engagements]
            updatedEngagements[engagements.findIndex(engagement => engagement._id === engagementId)] = data

            setEngagements(updatedEngagements)
            toast({ description: `Engagement "${data.engagementIdentifier}" has been updated successfully.` })

        }
    }, []);

    useEffect(() => {
        const down = (e) => {
            if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                submit()
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

return (
    <div className="space-y-6 h-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
            <div>
                <h3 className="text-lg font-medium">Executive Summary</h3>
                <p className="text-sm text-muted-foreground">
                    A high level summary of the engagement, designed for the client's stakeholders.
                </p>
            </div>
            <div>
                <Button onClick={() => submit()}>Save (ctrl+s)</Button>
            </div>
        </div>
        <Separator />
        {!loadingEngagements && engagement?.executiveSummary ? (
            <TextEditor initialValue={JSON.parse(engagement?.executiveSummary)} editorRef={executiveSummary}/>
        ) : (
            <span className="w-full flex items-center justify-center pt-6"><Loader2 className="h-8 w-8 animate-spin" /></span>
        )}
        <p></p>
    </div>
)
}