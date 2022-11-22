import vendors from '@common/get-dbs-to-test';
import { CreateCollection, CreateField, DeleteCollection } from '@common/functions';
import { PRIMARY_KEY_TYPES } from '@common/variables';

export const collectionArtists = 'test_items_no_relations_artists';

export const seedDBStructure = () => {
	it.each(vendors)(
		'%s',
		async (vendor) => {
			for (const pkType of PRIMARY_KEY_TYPES) {
				try {
					const localCollectionArtists = `${collectionArtists}_${pkType}`;

					// Delete existing collections
					await DeleteCollection(vendor, { collection: localCollectionArtists });

					// Create artists collection
					await CreateCollection(vendor, {
						collection: localCollectionArtists,
						meta: {},
						schema: {},
					});

					await CreateField(vendor, {
						collection: localCollectionArtists,
						field: 'name',
						type: 'string',
						meta: {},
						schema: {},
					});

					expect(true).toBeTruthy();
				} catch (error) {
					expect(error).toBeFalsy();
				}
			}
		},
		300000
	);
};
