export class ApiService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async insertPatient(patientObj) {
        const response = await fetch(`${this.baseUrl}/05/api/insert`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(patientObj)
        });
        const data = await response.text();
        return { status: response.status, ok: response.ok, data: data };
    }
    async insertMultiplePatients(patientsArray) {
        const results = [];
        for (const patient of patientsArray) {
            const res = await this.insertPatient(patient);
            results.push(res);
        }
        return results;
    }

    async runSqlQuery(rawSql) {
        //render firewall
        const base64Sql = window.btoa(rawSql.trim());
        const safeUrlParam = encodeURIComponent(base64Sql);

        const response = await fetch(`${this.baseUrl}/05/api/query/${safeUrlParam}`, {
            method: "GET"
        });
        const data = await response.text();
        return { status: response.status, ok: response.ok, data: data };
    }
}