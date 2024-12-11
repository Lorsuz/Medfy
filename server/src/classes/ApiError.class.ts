class ApiError extends Error {
	status: number;

	constructor(message: string, status?: number) {
			super(message);
			this.status = status || 500;
			this.name = 'ApiError'; 
	}
}

export default ApiError;