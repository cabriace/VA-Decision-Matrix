// ✅ Configure Supabase
const SUPABASE_URL = "https://ckkwxawqximvjvbeivek.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNra3d4YXdxeGltdmp2YmVpdmVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE4MjgxNzUsImV4cCI6MjA3NzQwNDE3NX0.R6L0eP2nMx0jBmBEglniB6PL5HgFh7NwZ0kSBp1vCf4"; // <— paste new key here

// ✅ Initialize client
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ✅ On button click
document.getElementById("lookupBtn").addEventListener("click", async () => {
  const input = document.getElementById("unspscInput").value.trim();
  const resultBox = document.getElementById("lookupResult");

  if (!input) {
    resultBox.innerHTML = "<p>Please enter a UNSPSC code.</p>";
    resultBox.classList.add("visible");
    return;
  }

  // ✅ Query Supabase
  const { data, error } = await supabaseClient
    .from("unspsc_codes")          // ← your table name
    .select("*")
    .eq("UNSPSC_Code", input)      // exact match
    .limit(1);

  // ✅ If exact match fails → try partial match
  let result = data;

  if (!result || result.length === 0) {
    const { data: partialData } = await supabaseClient
      .from("unspsc_codes")
      .select("*")
      .ilike("UNSPSC_Code", `${input}%`)  // starts with
      .limit(1);

    result = partialData;
  }

  // ✅ Handle errors
  if (error) {
    console.error(error);
    resultBox.innerHTML = `<p style="color:#ff6b6b;"><strong>Error:</strong> ${error.message}</p>`;
    resultBox.classList.add("visible");
    return;
  }

  // ✅ If still no result
  if (!result || result.length === 0) {
    resultBox.innerHTML = "<p>No match found.</p>";
    resultBox.classList.add("visible");
    return;
  }

  // ✅ Result found — format output
  const item = result[0];

  resultBox.innerHTML = `
    <p><strong>UNSPSC Code:</strong> ${item.UNSPSC_Code}</p>
    <p><strong>Phase:</strong> ${item["VA Phase/Level"] || item.VA_Phase_Level}</p>
    <p><strong>Description:</strong> ${item["UNSPSC LongDescription"] || item.LongDescription}</p>
  `;

  resultBox.classList.add("visible");
});
