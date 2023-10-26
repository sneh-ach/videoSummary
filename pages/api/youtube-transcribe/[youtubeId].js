import { YoutubeTranscript } from 'youtube-transcript';

export default async function handler(req, res) {
    const { youtubeId } = req.query;
    const transcript = await YoutubeTranscript.fetchTranscript(youtubeId);
    res.status(200).json({ transcript });
}