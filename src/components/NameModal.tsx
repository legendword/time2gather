import { Button, Checkbox, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useCheckbox, useDisclosure, VStack } from "@chakra-ui/react"
import { useState } from "react"


export const NameModal = (props: { submitName: (name: string, save: boolean) => void }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [name, setName] = useState('');
    const [save, setSave] = useState(true);

    const submitName = () => {
        if (name == '') {
            return;
        }
        onClose()
        props.submitName(name, save);
    }

    return (
        <>
            <Button onClick={onOpen}>
                Set My Availability
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Set Name</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel htmlFor='name'>Name</FormLabel>
                            <Input id='name' type='text' autoFocus value={name} onChange={(ev) => setName(ev.target.value)} />
                        </FormControl>
                        <Checkbox my={5} isChecked={save} onChange={(ev) => setSave(ev.target.checked)}>Save name in browser for this event</Checkbox>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='teal' mr={3} onClick={() => submitName()}>
                            OK
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}