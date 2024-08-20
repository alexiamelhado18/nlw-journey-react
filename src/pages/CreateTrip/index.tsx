//imagens
import Logo from "../../../public/logo.svg";

//hooks
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

//components
import { InviteGustsModal } from "../../components/InviteGuestsModal";
import { ConfirmTripModal } from "../../components/ConfirmTripModal";
import { DestinationAndDateStep } from "../../components/DestinationAndDatesStep";
import { InviteGuestsStep } from "../../components/InviteGuestsStep";

import { DateRange } from "react-day-picker";

//axios
import { AxiosResponse } from "axios";
import { api } from "../../utils/api";

export function CreateTrip() {

  const navigate = useNavigate();

  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);

  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);

  const [destination, setDestination] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>();


  function openGuestsInput() {
    setIsGuestsInputOpen(true);
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false);
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true);
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false);
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true);
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false);
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    //tira o comportamento padrão do evento
    event.preventDefault();
    //acessa os valores do formulario
    const data = new FormData(event.currentTarget);
    //pega o valor em especifico pelo seu name
    const newEmailSubmitted = data.get("email")?.toString();

    if (!newEmailSubmitted) return;
    if (emailsToInvite.includes(newEmailSubmitted)) return;


    setEmailsToInvite([...emailsToInvite, newEmailSubmitted]);

    //reseta valor do input que está no forms
    event.currentTarget.reset();
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(email => email !== emailToRemove);

    setEmailsToInvite(newEmailList);
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let response: AxiosResponse;

    if (!destination) {
      return;
    }
    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      return;
    }
    if (emailsToInvite.length === 0) {
      return;
    }
    if (!ownerName || !ownerEmail) {
      return;
    }

    try {
      response = await api.post("trips", {
        destination: destination,
        starts_at: eventStartAndEndDates.from,
        ends_at: eventStartAndEndDates.to,
        emails_to_invite: emailsToInvite,
        owner_name: ownerName,
        owner_email: ownerEmail
      });

      const { tripId } = response.data;

      navigate("/trips/" + tripId);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <main className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">

        <div className="max-w-3xl w-full px-6 text-center space-y-10 ">

          <div className="flex flex-col items-center gap-3">
            <img src={Logo} alt="Logo plann.er" />
            <span className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</span>
          </div>

          <form className="space-y-4">

            <DestinationAndDateStep
              closeGuestsInput={closeGuestsInput}
              isGuestsInputOpen={isGuestsInputOpen}
              openGuestsInput={openGuestsInput}
              setDestination={setDestination}
              eventStartAndEndDates={eventStartAndEndDates}
              setEventStartAndEndDates={setEventStartAndEndDates}
            />

            {isGuestsInputOpen && (
              < InviteGuestsStep
                emailsToInvite={emailsToInvite}
                openConfirmTripModal={openConfirmTripModal}
                openGuestsModal={openGuestsModal}
              />
            )}

          </form>

          <p className="text-sm text-zinc-500">
            Ao planejar sua viagem pela plann.er você automaticamente concorda <br /> com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade</a>.
          </p>
        </div >
      </main >

      {isGuestsModalOpen && (
        <InviteGustsModal
          addNewEmailToInvite={addNewEmailToInvite}
          closeGuestsModal={closeGuestsModal}
          emailsToInvite={emailsToInvite}
          removeEmailFromInvites={removeEmailFromInvites}
        />
      )}

      {isConfirmTripModalOpen && (
        <ConfirmTripModal
          closeConfirmTripModal={closeConfirmTripModal}
          createTrip={createTrip}
          setOwnerName={setOwnerName}
          setOwnerEmail={setOwnerEmail}
        />
      )}
    </>
  )
};
