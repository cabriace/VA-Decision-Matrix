// unspsc-lookup.js

const SUPABASE_URL = "https://ckkwxawqximvjvbeivek.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNra3d4YXdxeGltdmp2YmVpdmVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4MjgxNzUsImV4cCI6MjA3NzQwNDE3NX0.R6L0eP2nMx0jBmBEglniB6PL5HgFh7NwZ0kSBp1vCf4";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.getElementById("lookupBtn").addEventListener("click", async () => {
  const input = document.getElementById("unspscInput").value.trim();
  const resultBox = document.getElementById("lookupResult");

  if (!input) {
    resultBox.innerHTML = "<p>Please enter a UNSPSC code.</p>";
    resultBox.classList.add("visible");
    return;
  }

  // Query Supabase
  const { data, error } = await supabaseClient
    .from("unspsc_codes")
    .select("*")
    .ilike("UNSPSC_Code", `%${input}%`)
    .limit(1);

  if (error) {
    console.error("Supabase error:", error);
    resultBox.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    resultBox.classList.add("visible");
    return;
  }

  if (data && data.length > 0) {
    const item = data[0];
    resultBox.innerHTML = `
      <p><strong>UNSPSC Code:</strong> ${item.UNSPSC_Code}</p>
      <p><strong>Phase:</strong> ${item.VA_Phase_Level}</p>
      <p><strong>Description:</strong> ${item.LongDescription}</p>
    `;
  } else {
    resultBox.innerHTML = "<p>No match found.</p>";
  }

  resultBox.classList.add("visible");
});
