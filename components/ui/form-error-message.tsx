import { ControllerFieldState } from "react-hook-form"

export const FormErrorMessage = ({ fieldState }: { fieldState: ControllerFieldState }) => {
    return (
        <section className="text-red-600">
            {fieldState.error && (
                <span role="alert">
                    {fieldState.error.message}
                </span>
            )}
        </section>
    )
}