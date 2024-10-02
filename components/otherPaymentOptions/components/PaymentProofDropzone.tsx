import { ErrorToast } from "@/components/ui/error-toast"
import { UploadCloud, X } from "lucide-react"
import Image from "next/image"
import Dropzone from "react-dropzone"
import { Noop, UseFormReturn } from "react-hook-form"
import { MAX_FILE_SIZE } from "../constants"

export const PaymentProofDropzone = ({ onChange, onBlur, value, form }: {
    onChange: (...event: any[]) => void, onBlur: Noop, value: any, form: UseFormReturn<{
        payment_proof?: any;
    }, any, undefined>
}) => {
    // Drag & Drop for payment proof
    const onPaymentProofDrop = (acceptedFiles: any, rejectedFiles: any) => {
        if (acceptedFiles.length > 1) {
            ErrorToast({
                description: "You can only upload 1 file.",
            })
            return;
        } else if (acceptedFiles && acceptedFiles[0]?.size >= MAX_FILE_SIZE) {
            ErrorToast({
                description: "Max file size is 5 MB.",
            })
            return;
        } else if (rejectedFiles && rejectedFiles?.length) {
            ErrorToast({
                description: rejectedFiles[0]?.errors[0]?.message,
            })
            return;
        } else {
            form.setValue('payment_proof', acceptedFiles as unknown as FileList, {
                shouldValidate: true,
            });
            form.trigger('payment_proof')
        }
    }
    return (
        <Dropzone
            maxSize={MAX_FILE_SIZE}
            accept={{
                'image/jpg': [],
                'image/jpeg': [],
                'image/png': [],
                'image/webp': [],
            }}
            onDrop={onPaymentProofDrop}
        >
            {({
                getRootProps,
                getInputProps,
                isDragActive,
            }) => (
                <div className="mt-2">
                    <div
                        className={`text-muted-foreground cursor-pointer flex flex-col gap-2 h-auto w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-lg file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-dashed ${isDragActive ? 'bg-muted' : 'bg-transparent'}`}
                        {...getRootProps()}
                    >
                        <input
                            {...getInputProps({
                                id: 'spreadsheet',
                                onChange,
                                onBlur,
                            })}
                        />
                        <div className="flex gap-2">
                            <UploadCloud />
                            <p>
                                Choose a file
                                or drag and drop
                            </p>{' '}
                        </div>
                        <div className="flex gap-4">
                            <div>
                                <p>
                                    Accepted file types:
                                </p>
                                <p>
                                    JPEG, PNG, WEBP
                                </p>
                            </div>
                            <div>
                                <p>
                                    Max file size:
                                </p>
                                <p>
                                    5 MB
                                </p>
                            </div>
                            <div>
                                <p>
                                    File limit:
                                </p>
                                <p>
                                    1
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Preview uploaded images */}
                    <div className="flex flex-col items-start gap-4 mt-2">
                        {value &&
                            value.map((image: any, index: number) => (
                                <div key={index} className="flex gap-2 justify-center items-center">
                                    <div className="rounded relative w-12 h-12">
                                        <Image
                                            src={`${URL.createObjectURL(image)}`}
                                            alt="Participant's photo"
                                            priority={true}
                                            fill
                                            sizes="(min-width: 640px) 64px, 48px"
                                            className="rounded object-cover box-border overflow-hidden"
                                        />
                                    </div>
                                    <p
                                        className="text-lg text-muted-foreground"
                                    >
                                        {image.name}
                                    </p>
                                    <X
                                        className="w-5 h-5 text-muted-foreground"
                                        onClick={() => {
                                            value.splice(index, 1)
                                            form.setValue('payment_proof', [...value])
                                        }}
                                    />
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </Dropzone>
    )
}