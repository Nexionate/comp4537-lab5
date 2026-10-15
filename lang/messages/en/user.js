//Assisted by Gemini 
export const MESSAGES = {
    PAGE_TITLE: "Lab 5 - Patient Database Client",
    INSERT_SECTION_TITLE: "Insert Default Patients",
    INSERT_BTN_TEXT: "Insert 4 Default Patients",
    QUERY_SECTION_TITLE: "Run SQL Query",
    QUERY_PLACEHOLDER: "SELECT * FROM patient;",
    SUBMIT_QUERY_BTN_TEXT: "Submit Query",
    RESPONSE_TITLE: "Server Response:",
    LOADING_TEXT: "Communicating with server...",
    EMPTY_QUERY_ERROR: "Please enter a SQL query before submitting.",
    NETWORK_ERROR: "Network error occurred: "
};

export const DEFAULT_PATIENTS = [
    { name: "Sara Brown", dateofbirth: "1901-01-01" },
    { name: "John Smith", dateofbirth: "1941-01-01" },
    { name: "Jack Ma", dateofbirth: "1961-01-30" },
    { name: "Elon Musk", dateofbirth: "1999-01-01" }
];