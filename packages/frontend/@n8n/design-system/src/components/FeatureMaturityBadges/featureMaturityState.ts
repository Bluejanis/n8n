import {
	featureMaturity,
	type FeatureMaturity,
	type FeatureMaturityId,
} from '@n8n/frontend-constants/feature-maturity';
import { useSettingsStore } from '@n8n/stores/settings.store';
import { computed, reactive, type ComputedRef } from 'vue';

/**
 * Enable rows register here. A page title hides its badges while the same
 * feature has an enable row on the page.
 */
const claimedByEnableRow = reactive(new Set<FeatureMaturityId>());

export function claimFeatureMaturity(id: FeatureMaturityId | undefined): void {
	if (id) claimedByEnableRow.add(id);
}

export function releaseFeatureMaturity(id: FeatureMaturityId | undefined): void {
	if (id) claimedByEnableRow.delete(id);
}

export function isFeatureMaturityClaimed(id: FeatureMaturityId): boolean {
	return claimedByEnableRow.has(id);
}

/**
 * Keeps the test ids that pages already use. A new feature id becomes kebab-case.
 */
const TEST_IDS: Partial<Record<FeatureMaturityId, string>> = {
	assistant: 'n8n-agent',
	chat: 'chat-hub',
	context: 'settings-context',
	endUserCredentials: 'end-user-credentials',
	n8nPackages: 'n8n-packages',
	openTelemetry: 'open-telemetry',
	workflowReviews: 'security-workflow-reviews',
};

export function featureMaturityTestId(id: FeatureMaturityId): string {
	return TEST_IDS[id] ?? id.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

export function readFeatureMaturity(id: FeatureMaturityId): FeatureMaturity {
	return featureMaturity[id];
}

/** False when this component renders outside an app that has Pinia. */
export function useEnterprisePlan(): ComputedRef<boolean> {
	try {
		const settingsStore = useSettingsStore();
		return computed(() => settingsStore.isEnterprisePlan);
	} catch (error) {
		if (error instanceof Error && error.message.includes('no active Pinia')) {
			return computed(() => false);
		}
		throw error;
	}
}
