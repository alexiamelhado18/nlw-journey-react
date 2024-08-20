import { ArrowRight, UserRoundPlus } from "lucide-react";
import { Button } from "../Button";

interface InviteGuestsStepProps {
    openGuestsModal: () => void,
    emailsToInvite: string[],
    openConfirmTripModal: () => void
};

export function InviteGuestsStep({
    emailsToInvite,
    openConfirmTripModal,
    openGuestsModal
}: InviteGuestsStepProps) {
    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-2">

            <button
                type="button"
                className="flex items-center gap-2 flex-1"
                onClick={openGuestsModal}
            >
                <UserRoundPlus className="size-5 text-zinc-400" />

                {emailsToInvite.length > 0 ? (
                    <span className="text-zinc-100 text-lg flex-1 text-start">{emailsToInvite.length} pessoa(s) convidada(s)</span>
                ) : (
                    <span className="text-lg text-zinc-400 flex-1 text-start">Quem estará na viagem?</span>
                )}


            </button>


            <div className="w-px h-6 bg-zinc-800" />

            <Button
                type="button"
                onClick={openConfirmTripModal}
            >
                Confirmar viagem
                <ArrowRight className="size-5 text-lime-950" />
            </Button>

        </div>
    );
}