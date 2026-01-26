/**
 * Calculates the 'Hotness' score for a wish card.
 * Formula: log10(Engagement) + (Seconds / 86400)
 * This balances popularity with freshness.
 */
export function calculateHotnessScore(
    likes: number,
    reposts: number,
    tipsValue: number,
    timestampSeconds?: number
): number {
    const engagement = (likes * 1) + (reposts * 2) + (tipsValue * 0.1);
    const logEngagement = Math.log10(Math.max(1, engagement));

    const seconds = timestampSeconds || Math.floor(Date.now() / 1000);

    // Each day adds 1.0 points to the base score.
    // 1 log point (interaction factor) is equal to 1 day of freshness.
    return logEngagement + (seconds / 86400);
}
