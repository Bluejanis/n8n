import { render } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { mount } from '@vue/test-utils';

import N8nBadge from '../N8nBadge';

import PreviewBadge from './PreviewBadge.vue';

describe('PreviewBadge', () => {
	it('uses the outline variant and forwards its size', () => {
		const wrapper = mount(PreviewBadge, { props: { size: 'small' } });
		expect(wrapper.getComponent(N8nBadge).props()).toMatchObject({
			variant: 'outline',
			size: 'small',
		});
	});

	it('explains Preview and links to the feature docs', async () => {
		const { getByText, findByRole } = render(PreviewBadge, {
			props: { docsUrl: 'https://docs.n8n.io/build/build-and-manage-agents' },
		});

		await userEvent.tab();
		expect(getByText('Preview').closest('.n8n-badge')).toHaveFocus();
		expect(await findByRole('link', { name: 'Learn more' })).toHaveAttribute(
			'href',
			'https://docs.n8n.io/build/build-and-manage-agents',
		);
	});

	it('renders custom text instead of the default label', () => {
		const { getByText } = render(PreviewBadge, { props: { text: 'Early preview' } });
		expect(getByText('Early preview')).toBeInTheDocument();
	});
});
