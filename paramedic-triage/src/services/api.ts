//simulating  a mock backend service for the purpose of this demo

export class ApiService {
  async upload(record: any) {
    console.log("Uploading...", record.patientName);

    await new Promise((resolve) =>
      setTimeout(resolve, 2000)
    );

    // Simulate a slow server
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Simulate 80% success
    if (Math.random() > 0.2) {
        console.log("Upload successful:", record.patientName);
      return true;
    }

    throw new Error("Simulated network failure");
  }
}