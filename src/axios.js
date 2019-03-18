import axios from 'axios';

const instance = axios.create({
	baseUrl: 'http://example.org/w/api.php'
});

export default instance;

//const url = '/w/api.php?action=query&format=json&list=search&srsearch='
