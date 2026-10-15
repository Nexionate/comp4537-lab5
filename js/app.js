// Assisted by Gemini
import { MESSAGES, DEFAULT_PATIENTS } from "../lang/messages/en/user.js";
import { ApiService } from "./db_api.js";

class ClientApp {
    constructor(apiService) {
        this.apiService = apiService;
        this.initElements();
        this.populateStrings();
        this.attachEventListeners();
    }

    initElements() {
        this.pageTitle = document.getElementById("page-title");
        this.insertTitle = document.getElementById("insert-title");
        this.insertBtn = document.getElementById("insert-btn");
        this.queryTitle = document.getElementById("query-title");
        this.sqlInput = document.getElementById("sql-input");
        this.submitQueryBtn = document.getElementById("submit-query-btn");
        this.responseTitle = document.getElementById("response-title");
        this.responseOutput = document.getElementById("response-output");
    }

    populateStrings() {
        document.title = MESSAGES.PAGE_TITLE;
        this.pageTitle.textContent = MESSAGES.PAGE_TITLE;
        this.insertTitle.textContent = MESSAGES.INSERT_SECTION_TITLE;
        this.insertBtn.textContent = MESSAGES.INSERT_BTN_TEXT;
        this.queryTitle.textContent = MESSAGES.QUERY_SECTION_TITLE;
        this.sqlInput.placeholder = MESSAGES.QUERY_PLACEHOLDER;
        this.submitQueryBtn.textContent = MESSAGES.SUBMIT_QUERY_BTN_TEXT;
        this.responseTitle.textContent = MESSAGES.RESPONSE_TITLE;
    }

    attachEventListeners() {
        this.insertBtn.addEventListener("click", () => this.handleInsertPatients());
        this.submitQueryBtn.addEventListener("click", () => this.handleRunQuery());
    }

    displayOutput(content) {
        try {
            const parsed = JSON.parse(content);
            this.responseOutput.textContent = JSON.stringify(parsed, null, 2);
        } catch {
            this.responseOutput.textContent = content;
        }
    }

    async handleInsertPatients() {
        this.displayOutput(MESSAGES.LOADING_TEXT);
        try {
            const results = await this.apiService.insertMultiplePatients(DEFAULT_PATIENTS);
            this.displayOutput(JSON.stringify(results, null, 2));
        } catch (error) {
            this.displayOutput(MESSAGES.NETWORK_ERROR + error.message);
        }
    }

    async handleRunQuery() {
        const query = this.sqlInput.value.trim();
        if (!query) {
            this.displayOutput(MESSAGES.EMPTY_QUERY_ERROR);
            return;
        }

        this.displayOutput(MESSAGES.LOADING_TEXT);
        try {
            const result = await this.apiService.runSqlQuery(query);
            this.displayOutput(result.data);
        } catch (error) {
            this.displayOutput(MESSAGES.NETWORK_ERROR + error.message);
        }
    }
}

//Instantiate objects when dom ready
document.addEventListener("DOMContentLoaded", () => {
    const api = new ApiService("https://comp-4537-05-db.onrender.com");
    new ClientApp(api);
});