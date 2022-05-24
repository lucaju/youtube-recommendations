import { DateTime } from 'luxon';
import { Model, model, Schema } from 'mongoose';
import type { IRecommendedVideo } from '../../crawler';
import type { IWatched } from '../types';

interface IWatchedVideoModel extends Model<IWatched> {
  isWatchedToday(projectId: string, keyword: string, id: string, date: Date): Promise<boolean>;
}

export const WatchedVideoSchema = new Schema<IWatched, IWatchedVideoModel>(
  {
    ytId: { type: String, required: true },
    comments: { type: Number, default: -1 },
    date: { type: Date, required: true },
    depth: { type: Number, default: 0 },
    likes: { type: Number, default: -1 },
    keyword: { type: String, required: true },
    recommended: Number,
    recommendations: [new Schema<IRecommendedVideo>({ ytId: String, title: String })],
    project: { type: Schema.Types.ObjectId, ref: 'Project' },
    views: { type: Number, default: -1 },
    title: String,
  },
  { strict: false, timestamps: true }
);

WatchedVideoSchema.virtual('details', {
  ref: 'Video',
  localField: 'ytId',
  foreignField: 'ytId',
});

WatchedVideoSchema.statics.isWatchedToday = async (projectId, keyword, ytId, date) => {
  const { year, month, day } = DateTime.fromJSDate(date);

  const start = DateTime.fromObject({ year, month, day }).toISO();
  const end = DateTime.fromObject({
    year,
    month,
    day,
    hour: 23,
    minute: 59,
    second: 59,
    millisecond: 999,
  }).toISO();

  const video = await WatchedVideoModel.exists({
    projectId,
    keyword,
    ytId,
    date: { $gte: start, $lte: end },
  });
  return !!video;
};

export const WatchedVideoModel = model<IWatched, IWatchedVideoModel>(
  'WatchedVideo',
  WatchedVideoSchema
);
