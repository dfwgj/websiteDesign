import { defineStore } from 'pinia';
import contest from '@/api/contest';

export const contestStore = defineStore('contestStore', {
    state: () => ({
        contestId: null,
        name: null,
        topic: null,
        introduce: null,
        doubleKnots: null,
        userLink: null,
        qrLink: null,
        organizers: null,
        contractors: null,
        year: null,
        createdAt: null,
        date: {},
        group: [],
        awards: [],
        direction: []
    }),
    actions: {
        async getContest() {
            const res = await contest.getContest();
            if (res.success) {
                this.contestId = res.data[0].id;
                this.name = res.data[0].name;
                this.topic = res.data[0].topic;
                this.introduce = res.data[0].introduce;
                this.doubleKnots = res.data[0].doubleKnots;
                this.userLink = res.data[0].userLink;
                this.qrLink = res.data[0].qrLink;
                this.organizers = res.data[0].organizers;
                this.contractors = res.data[0].contractors;
                this.year = res.data[0].year;
                this.createdAt = res.data[0].createdAt;
                this.date = res.data[0].date;
                this.group = res.data[0].group;
                this.awards = res.data[0].awards;
                this.direction = res.data[0].direction;
                return true;
            }else {
                return false;
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
            this.date = {};
            this.group = [];
            this.awards = [];
            this.direction = [];
        }
    }
});
