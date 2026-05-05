import { app } from './app';

const port = process.env.PORT || 5000;

// Start server
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
	console.error('Unhandled Rejection at:', promise, 'reason:', reason);
	// Close server & exit process
	process.exit(1);
});
