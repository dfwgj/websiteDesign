import { defineStore } from 'pinia';
import contest from '@/api/contest';

export const contestStore = defineStore('contestStore', {
    state: () => ({
        contestId: null,
        name: null,
        topic: null,
        introduce: null,
        doubleKnots: null,
        qrLink: null,
        organizers: null,
        contractors: null,
        year: null,
        createdAt: null,
        date: {
            spotDate: null,
            spotPlace: null,
            submissionDate: null,
            submissionPlace: null,
            preliminaryDate: null,
            preliminaryPlace: null,
            finalDate: null,
            finalPlace: null
        },
        awards: [],
        direction: []
    }),
    actions: {
        async getContest() {
            const res = (await contest.getContest())[0];
            if (res) {
                this.contestId = res.id;
                this.name = res.name;
                this.topic = res.topic;
                this.introduce = res.introduce;
                this.doubleKnots = res.doubleKnots;
                this.qrLink = res.qrLink;
                this.organizers = res.organizers;
                this.contractors = res.contractors;
                this.year = res.year;
                this.createdAt = res.createdAt;
                this.date = res.date;
                this.awards = res.awards;
                this.direction = res.direction;
            }
        },
        //清除比赛信息
        clearContestInfo() {
            this.contestId = null;
            this.name = null;
            this.topic = null;
            this.introduce = null;
            this.doubleKnots = null;
            this.qrLink = null;
            this.organizers = null;
            this.contractors = null;
            this.year = null;
            this.createdAt = null;
            this.date = {
                spotDate: null,
                spotPlace: null,
                submissionDate: null,
                submissionPlace: null,
                preliminaryDate: null,
                preliminaryPlace: null,
                finalDate: null,
                finalPlace: null
            };
            this.awards = [];
            this.direction = [];
        }
    }
});
