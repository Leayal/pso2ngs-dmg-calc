/**
 * Stat ID table in PSO2 NGS game.
 */
const tbStatId = Object.freeze({
  None: 0,
  /**
   * Health power.
   */
  HP: 1 << 0,
  /**
   * PP.
   */
  PP: 1 << 1,
  /**
   * Strike damage.
   */
  StrikeDamage: 1 << 2,
  /**
   * Shoot damage.
   */
  ShootDamage: 1 << 3,
  /**
   * Tech damage.
   */
  TechDamage: 1 << 4,
  /**
   * Strike + Shoot + Tech damage.
   */
  AllDamage: StrikeDamage | ShootDamage | TechDamage,
  /**
   * Strike + Shoot damage. --asha capsule usually has thing kind of thing.
   */
  StrikeShootDamage: StrikeDamage | ShootDamage, // Or AllDamage & ~TechDamage.
  /**
   * Strike + Tech damage. --asha capsule usually has thing kind of thing.
   */
  StrikeTechDamage: StrikeDamage | TechDamage, // Or AllDamage & ~ShootDamage,
  /**
   * Shoot + Tech damage. --asha capsule usually has thing kind of thing.
   */
  ShootTechDamage: ShootDamage | TechDamage, // Or AllDamage & ~StrikeDamage,
  /**
   * The minimum variance of damage.
   */
  DamageVariance: 1 << 5,
  /**
   * Damage resistance (Damage reduction on receiving damage).
   */
  DamageResist: 1 << 6,
  /**
   * PP recovery naturally by time.
   */
  NaturalPPRecovery: 1 << 7,
  /**
   * PP recovery by successfully hitting a target.
   */
  PPRecoveryAttacking: 1 << 8,
});
Object.defineProperty(window || this, "tbStatId", {
  configurable: false,
  enumerable: true,
  value: tbStatId,
  writable: false,
});
