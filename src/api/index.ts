import OpenTDBService from "./OpenTDBService";


interface ApiOBject {
    OpenTDBService: OpenTDBService;
}

const api: ApiOBject = {
    OpenTDBService: new OpenTDBService()
}

export default api;