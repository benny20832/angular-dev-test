// TODO: specify the interface for the DTO object, that you use for storing and loading data.
export interface Dto {
    personalData: PersonalData,
    invoiceData: InvoiceData
}

export interface PersonalData {
    firstName: string,
    lastName: string
}

export interface InvoiceData {
    firstName: string,
    lastName: string,
    company: string,
    street: string,
    zipCode: string,
    city: string
}