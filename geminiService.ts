
export const getSharkAdvice = async (bountyTitle: string) => {
  try {
    const response = await fetch('/api/shark-advice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bountyTitle })
    });
    const data = await response.json();
    return data.text;
  } catch (error) {
    return "Refactor or perish. The clock is ticking.";
  }
};

export const generateBountyBriefing = async (bountyTitle: string) => {
  try {
    const response = await fetch('/api/bounty-briefing', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bountyTitle })
    });
    return await response.json();
  } catch (error) {
    return { steps: ["Analyze requirements", "Implement fix", "Secure the bag"] };
  }
};
