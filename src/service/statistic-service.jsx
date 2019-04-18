import MUtil from 'util/comm.jsx';

const _mm = new MUtil();

class Statistic {
	// 首页统计
	getHomeCount() {
		return _mm.request({
			url: '/manage/statistic/base_count.do'
		});
	}
}

export default Statistic;
