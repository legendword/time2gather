import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button } from "@chakra-ui/react"
import { useRef, useState } from "react"

const errorTypes: { [key: string]: { title: string, message: string }} = {
    'ARGUMENT_ERROR': {
        title: 'Argument Error',
        message: 'Some argument is missing, or the format of argument is invalid.'
    },
    'INVALID_TITLE': {
        title: 'Invalid Title',
        message: 'The title must be between 0 and 200 characters.'
    },
    'INVALID_DATES': {
        title: 'Invalid Dates',
        message: 'You must choose at least one possible date for this meeting.'
    },
    'DUPLICATE_ID': {
        title: 'Duplicate ID',
        message: 'The server failed to generate a unique ID for this meeting. This is a low-chance event and should be resolved by trying again.'
    },
    'INVALID_NAME': {
        title: 'Invalid Name',
        message: 'The name must be between 0 and 100 characters.'
    },
    'DUPLICATE_NAME': {
        title: 'Duplicate Name',
        message: 'The availability of the attendee with this name has already been set. The creater of this meeting did not allow editing availability.'
    },
    'NOT_FOUND': {
        title: 'Meeting Not Found',
        message: 'A meeting with this ID does not exist.'
    }
};

export const ErrorDialog = (props: { errorCode: string | null, isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) => {
    const onClose = () => props.setIsOpen(false)
    const leastDestructiveRef = useRef(null)

    return (
        <>
            <AlertDialog
                isOpen={props.isOpen}
                onClose={onClose}
                leastDestructiveRef={leastDestructiveRef}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            { props.errorCode ? errorTypes[props.errorCode].title : '' }
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            { props.errorCode ? errorTypes[props.errorCode].message : '' }
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={leastDestructiveRef} onClick={onClose} ml={3}>
                                OK
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}