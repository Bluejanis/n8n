import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { ref } from 'vue';

import N8nSettingsEnableRow from './SettingsEnableRow.vue';
import N8nSettingsRowGroup from '../N8nSettingsRowGroup';

const meta = {
	title: 'Areas/Settings/EnableRow',
	component: N8nSettingsEnableRow,
	parameters: {
		docs: {
			description: {
				component:
					'The enable control for a settings feature. It renders the title, the description, the switch, and the feature maturity badges. Pass a `feature` id. The row reads the feature list and the instance plan. A page title that uses the same id hides its badges while this row is on the page.',
			},
		},
	},
} satisfies Meta<typeof N8nSettingsEnableRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => ({
		components: { N8nSettingsEnableRow, N8nSettingsRowGroup },
		setup: () => {
			const enabled = ref(false);
			return { args, enabled };
		},
		template: `
			<div style="max-width: 45rem;">
				<N8nSettingsRowGroup>
					<N8nSettingsEnableRow v-bind="args" v-model="enabled" />
				</N8nSettingsRowGroup>
			</div>
		`,
	}),
	args: {
		title: 'Enable Agents',
		description:
			'Allow users to build and run agents. Turning this off blocks new runs and cancels pending messages.',
		feature: 'agents',
		maxDescriptionLines: 3,
	},
};
