import OpenTDBService from "@api/OpenTDBService";

interface OpenTDBApi {
	OpenTDBService: OpenTDBService;
}

const api: OpenTDBApi = {
	OpenTDBService: new OpenTDBService()
}

export default api;