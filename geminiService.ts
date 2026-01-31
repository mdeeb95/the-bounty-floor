
export const getSharkAdvice = async (bountyTitle: string) => {
  try {
    const response = await fetch('/api/shark-advice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bountyTitle })
    });
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data.text || "Refactor or perish. The clock is ticking.";
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
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    if (!data.steps) throw new Error('Invalid data format');
    return data;
  } catch (error) {
    return { steps: ["Analyze requirements", "Implement fix", "Secure the bag"] };
  }
};
