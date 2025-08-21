import { DataTypes } from 'sequelize';
import { sequelizeInstance as sequelize } from '../../db/dbUtils.js';

const PromptCategory = sequelize.define('PromptCategory', {
  titleEn: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  titleIt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descriptionEn: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descriptionIt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  promptIds: {
    type: DataTypes.JSONB, // Array of prompt IDs (JSON array)
    allowNull: true, // Nullable if no prompts are associated initially
  },
}, {
  timestamps: false,  // We are manually handling the timestamp if needed
});

// Associations can be defined if needed (e.g., many-to-many with Prompt)
PromptCategory.associate = (models) => {
  PromptCategory.belongsToMany(models.Prompt, { through: 'PromptCategoryPrompt' });
};

export { PromptCategory };
